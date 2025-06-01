"use client"

const Button: React.FC<{ label: string }> = ({ label }) => {
  // const Button = ({ label }: { label: string }) => {
  return (
    <button
      onClick={() => {
        alert("hello from Client")
      }}
    >
      {label}
    </button>
  )
}

export default Button
