'use client'
import BeatLoader from 'react-spinners/BeatLoader'

import { LOGIN_PAGE } from "@/routes"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { newVerification } from '@/actions/auth/new-verification'
import { FormSuccess } from '../form/form-success'
import { FormError } from '../form/form-error'

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError('Missing token!')
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success)
        setError(data.error)
      })
      .catch(() => setError('Something went wrong'))
  }, [token, success, error])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref={LOGIN_PAGE}
    >
      <div className="flex items-center w-full justify-center">
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
        {!error && !success && <BeatLoader />}
      </div>
    </CardWrapper>
  )
}
