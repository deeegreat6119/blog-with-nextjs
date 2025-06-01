"use client"

const Error = ({
  //   error,
  reset,
}: {
  //   error: Error & { digest?: string }
  reset: () => void
}) => {
  return (
    <div>
      error
      <button onClick={() => reset()}>Reset</button>
    </div>
  )
}

export default Error
