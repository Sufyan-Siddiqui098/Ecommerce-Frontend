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
        return json;            //return - will make the json available in action.payload below;

    }
    catch(error){
        console.log("Error:", error)
    }
})

export  const userSlice = createSlice({
    name: 'user',
    initialState:{
        userInfo : {},
        message: '',
        error: false
    },
    reducers:{

    },
    extraReducers: (builder) => {
        //Register new user
        builder.addCase(registerUser.fulfilled, (state, action)=>{
            if(action.payload.success){
                state.error = false;
                // console.log("action", action.payload.user)
                state.userInfo = action.payload.user;
                state.message = action.payload.message;
                console.log("userInfo at redux-toolkit ", state.userInfo);
            }
            else{
                state.error = true;
                state.message = action.payload.message
                // console.log("Error occured", state.error)
            }
        })
    }
})


export default userSlice.reducer;