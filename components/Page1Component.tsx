import { useState, useCallback, useEffect } from "react"
import { Button, Paper, TextField } from "@mui/material"
import { IUserData } from "../types"
import {useNavigate} from 'react-router-dom'

function Page1Component() {
  let navigate=useNavigate()
  const [name, setName] = useState<string>("")
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [nameError, setNameError] = useState<string>("")
  const [phoneNumberError, setPhoneNumberError] = useState<string>("")
  const [emailError, setEmailError] = useState<string>("")

  useEffect(() => {
        if(localStorage.getItem("userData")){
            localStorage.clear()
        }
      }, [])

  const validatePhoneNumber = useCallback((phoneNumber: string) => {
    //phone number with country code
    const regex = /^[0-9]{10}$/
    return regex.test(phoneNumber)
  }, [])

  const validateEmail = useCallback((email: string) => {
    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
    return regex.test(email)
  }, [])

  const validateForm = useCallback((name: string, phoneNumber: string, email: string) => {
    let result = true
    if (name === "") {
      setNameError("Name is required")
      result = false
    }
    else setNameError("")
    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneNumberError("Phone number is invalid")
      result = false
    }
    else setPhoneNumberError("")
    if (!validateEmail(email)) {
      setEmailError("Email is invalid")
      result = false
    }
    else setEmailError("")
    return result
  }, [validatePhoneNumber, validateEmail])

  const handleFormSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm(name, phoneNumber, email)) {
      //add all data as json to localstorage
      const userData: IUserData = {
        name: name,
        phoneNumber: phoneNumber,
        email: email
      }
      const jsonData = JSON.stringify(userData)
      localStorage.setItem("userData", jsonData)

      alert("Form submitted successfully")
      navigate('/') //Navigating to the table page
    }
  }, [validateForm, name, phoneNumber, email])

  return (
    <div style={{ margin: "4rem", width: "40%" }}>

    <form onSubmit={handleFormSubmit}>
      <Paper elevation={4} style={{ padding: "2rem 4rem 1rem 4rem" }}>
        <TextField
          label="Name"
          placeholder="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={nameError !== "" ? true : false}
          helperText={nameError !== "" ? nameError : ""}
          fullWidth
          style={{ margin: "0.5rem 0rem" }}
          />
        <TextField
          label="Phone Number"
          placeholder="Phone Number"
          variant="outlined"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          error={phoneNumberError !== "" ? true : false}
          helperText={phoneNumberError !== "" ? phoneNumberError : ""}
          fullWidth
          style={{ margin: "0.5rem 0rem" }}
          />
        <TextField
          label="Email"
          placeholder="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError !== "" ? true : false}
          helperText={emailError !== "" ? emailError : ""}
          fullWidth
          style={{ margin: "0.5rem 0rem 2rem 0rem" }}
          />
        <div style={{ display: "flex", flexGrow: 1, justifyContent: "center" }}>
          <Button
            variant="contained"
            type="submit"
            >
            Submit
          </Button>
        </div>
      </Paper>
    </form>
    </div>
  )
}

export { Page1Component }