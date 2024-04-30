import axios from 'axios';
import './App.css';
import React, { useState} from 'react'
import secureLocalStorage from "react-secure-storage";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  secureLocalStorage.removeItem('email')
  secureLocalStorage.removeItem('password')


  const handleSubmit = (e) => {

    e.preventDefault()

    axios.post('https://staging.apis.enlarge.ginnsltd.com/login',
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      ).then((res) => {

          console.log('Response', res.data)
          // console.log('Response Data', res.data)

          const token = res.data.token;

          // console.log('Token', token)

          secureLocalStorage.setItem('token', token)

          if(res.data.ok === true){
            toast.success('Logged In Successfully!', {
              transition: Bounce,
            })
          }else{
            toast.error('Something went wrong!', {
              transition: Bounce,
            });
          }

          
      
    }).catch((e) => {
      toast.error('Something went wrong!', {
        transition: Bounce,
      });

      console.log('Error', e)
    })


    
  }

  // useEffect(() => {
  //   // handleSubmit()
  // }, [])

  return (
    <>
      <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="light"
        />
      <div className='flex flex-col items-center justify-center w-full h-screen font-mono'>
        <h1 className='font-semibold tracking-wider my-2 text-[1.3rem]'>Login!</h1>
        <form onSubmit={handleSubmit} className='w-[65%] lg:w-[40%] h-[35%] p-3 flex flex-col justify-between shadow-md'>
          <div className='flex flex-col items-start gap-2 w-full'>
            <label>E-mail Address:</label>
            <input className='border border-black w-full p-2 rounded-md' placeholder='Enter Your E-mail Address' value={email} onChange={(e) => setEmail(e.target.value)}></input>
          </div>

          <div className='flex flex-col items-start gap-2 w-full'>
            <label>Password:</label>
            <input className='border border-black w-full p-2 rounded-md' placeholder='Enter Your Password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
          </div>

          <button className='w-full rounded-lg bg-blue-500 text-white p-2' type='submit'>Submit</button>
        </form>
      </div>
    </>
  );
}

export default App;
