import React, { useState, useContext } from 'react'
import {
    Card,
    CardHeader,
    CardContent,
    TextField,
    InputAdornment,
    IconButton,
    Alert
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'

import { AuthContext } from '../../context/auth'
import { LOGIN_USER } from '../../graphql/mutations/user'
import styles from './LoginPage.module.scss'

const LoginPage = () => {
    const router = useRouter()
    const { login, setRememberInfo } = useContext(AuthContext)

    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const [loginUser] = useMutation(LOGIN_USER, {
        onCompleted({ login: loginData }) {
            login(loginData)
            setLoading(false)
            router.push('/')
        },
        onError(err) {
            setLoading(false)
            setError(
                err.graphQLErrors[0].message ??
                    'There was an issue trying to log in. Please try again.'
            )
        },
        variables: {
            email,
            password
        }
    })

    const handleInputChange = ({ target: { name, value } }) => {
        switch (name) {
            case 'email':
                setEmail(value)
                break
            case 'password':
                setPassword(value)
                break
            default:
                break
        }
    }

    const onSubmit = e => {
        e.preventDefault()
        if (error) setError('')
        setLoading(true)
        loginUser()
    }
    return (
        <section className={styles.LoginPage}>
            <Card className={styles.Card}>
                <CardHeader title="Model Insights Login" />
                <CardContent>
                    <form onSubmit={onSubmit}>
                        <TextField
                            variant="outlined"
                            size="small"
                            label="Email"
                            name="email"
                            value={email}
                            onChange={handleInputChange}
                        />
                        <TextField
                            size="small"
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            label="Password"
                            name="password"
                            variant="outlined"
                            value={password}
                            onChange={handleInputChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            edge="end">
                                            {showPassword ? (
                                                <Visibility />
                                            ) : (
                                                <VisibilityOff />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <LoadingButton
                            type="submit"
                            loading={loading}
                            variant="contained"
                            className={styles.submit}>
                            SUBMIT
                        </LoadingButton>
                        {error ? <Alert severity="error">{error}</Alert> : null}
                    </form>
                </CardContent>
            </Card>
        </section>
    )
}

export default LoginPage
