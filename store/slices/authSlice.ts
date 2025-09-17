import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { storageService } from "../../services/storage";
import { UserDetails } from "../../types/api";

// Auth state interface
export interface AuthState {
  user: UserDetails | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  error: null,
};

// Initialize auth state from storage, when the app starts
export const initializeAuth = createAsyncThunk(
  "auth/initialize",
  async (_, { rejectWithValue }) => {
    try {
      const token = await storageService.getAccessToken();

      if (token) {
        return {
          isAuthenticated: true,
        };
      }

      return {
        user: null,
        isAuthenticated: false,
      };
    } catch (error) {
      console.error("Failed to initialize auth:", error);
      return rejectWithValue("Failed to initialize authentication");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await storageService.clearTokens();
      return true;
    } catch (error) {
      console.error("Failed to logout:", error);
      return rejectWithValue("Failed to logout");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Call after successful login/register
    setUser: (state, action: PayloadAction<UserDetails>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },

    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },

    updateUserProfile: (state, action: PayloadAction<Partial<UserDetails>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    // Force logout (used by API interceptors when token is invalid)
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Initialize auth
      .addCase(initializeAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isInitialized = true;
        state.isAuthenticated = action.payload.isAuthenticated;
        state.error = null;
      })
      .addCase(initializeAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isInitialized = true;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      })

      // Logout user
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

// Export actions
export const {
  setUser,
  clearUser,
  setLoading,
  setError,
  clearError,
  updateUserProfile,
  logout,
} = authSlice.actions;

// Export reducer
export default authSlice.reducer;

// Selectors
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
export const selectIsLoading = (state: { auth: AuthState }) =>
  state.auth.isLoading;
export const selectIsInitialized = (state: { auth: AuthState }) =>
  state.auth.isInitialized;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
