import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../../firebase.config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';

const initialState = {
  user: null,
  status: 'idle',
  error: null,
};

export const signup = createAsyncThunk(
  'auth/signup',
  async ({ email, password, firstName, lastName }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: `${firstName} ${lastName}` });
      let userData= { uid: userCredential.user.uid, email: userCredential.user.email, firstName: userCredential.user.firstName };
      // localStorage.setItem('user',JSON.stringify(userData));
      // console.log(userData)
      return userData
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userData= { uid: userCredential.user.uid, email: userCredential.user.email, firstName: userCredential.user.firstName };
      localStorage.setItem('user',JSON.stringify(userData));
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
      try {
        await signOut(auth);
      } catch (error) {
        return rejectWithValue(error.message);
      }
    });
    const authSlice = createSlice({
        name: 'auth',
        initialState,
        reducers: {
          resetAuthState: (state) => {
            state.user = null;
            state.error = null;
          },
        },
        extraReducers: (builder) => {
          builder
            .addCase(signup.pending, (state) => {
              state.status = 'loading';
            })
            .addCase(signup.fulfilled, (state, action) => {
              state.user = action.payload; 
              state.status = 'succeeded';
              state.error = null;
            })
            .addCase(login.pending, (state) => {
              state.status = 'loading';
              state.error=null;
            })
            .addCase(login.fulfilled, (state, action) => {
              state.user = action.payload; 
              state.status = 'succeeded';
              state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
              state.error = action.payload;
              state.status = 'failed';
            })
            .addCase(logout.pending, (state) => {
              state.status = 'loading';

            })
            .addCase(logout.fulfilled, (state) => {
              state.user = null;
              state.status = 'idle';
              state.error = null;
            })
            .addCase(logout.rejected, (state, action) => {
              state.user=null,  
              state.error = action.payload;
              state.status = 'failed';
            });
        },
      });
      
      export const { resetAuthState } = authSlice.actions;
      export default authSlice.reducer;
