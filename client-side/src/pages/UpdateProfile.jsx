import React, { useState } from 'react'
import Axios from 'axios'

function UpdateProfile() {
// const btnHandler = async () => {
//     const response = await Axios.post("http://localhost:8001/validation", {
//         email: "lena@gmail.com",
//         password: 12345
//     })
    
// }

const [file, setFile] = useState(null)
const [isLoading, setIsLoading] = useState(false)

const onFileChange = (event) => {
    setFile(event.target.files[0])
    let preview = document.getElementById("imagepreview")
    preview.src = URL.createObjectURL(event.target.files[0])
}

const uploadImage = async () => {
    setIsLoading(true)
    if(file) {
        const obj = {
            id: 11
        }

        let formData = new FormData()
        formData.append("file", file)
        formData.append("data", JSON.stringify(obj))

        const response = await Axios.post("http://localhost:8001/upload", formData)

        if(!response.error) {
            alert("Upload successful")
        } else {
            alert("Select image first")
        }
    }
    setIsLoading(false)
}

return (
    <div className='w-3/4 m-auto bg-blue-200'>
        <p>Update Profile</p>
        <div>
            <img id="imagepreview" width="400px" height="400px" />
        </div>
        <div>
            <input type="file" id="file" onChange={(event) => {onFileChange(event)}} />
        </div>
        {isLoading ? (
            <button className='bg-green-400 px-4 py-2 rounded-md hover:bg-green-500' onClick={uploadImage} disabled>Upload</button>):
            (
                <button className='bg-green-400 px-4 py-2 rounded-md hover:bg-green-500' onClick={uploadImage} >Upload</button>
            )}
    </div>
  )
}

export default UpdateProfile