import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

export const registerUser = createAsyncThunk('user/register', async(data)=>{
    try{
        const response = await fetch('http://localhost:8080/api/v1/auth/register', {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
        const json = await response.json();
        console.log("json", json)
        return json;

    }
    catch(error){
        console.log("Error:", error)
    }
})

export  const userSlice = createSlice({
    name: 'user',
    initialState:{
        userInfo : []
    },
    reducers:{

    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.fulfilled, (state, action)=>{
            console.log("action", action.payload)
            state.userInfo.push(action.payload) 
        })
    }
})


export default userSlice.reducer;