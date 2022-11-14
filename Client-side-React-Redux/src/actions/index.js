import streams from '../apis/streams'
import history from '../history'
import {SIGN_IN,
        SIGN_OUT,
        CREATE_STREAM,
        DELETE_STREAM,
        FETCH_STREAMS,
        FETCH_STREAM,
        UPDATE_STREAM
    } from '../actions/types'

export const signIn = (userId) =>{
    return {
        type:SIGN_IN,
        payload:userId
    }
}

export const signOut = () =>{
    return {
        type:SIGN_OUT
    }
}


//axios func to create stream store {post}
export const createStream = formValue => async (dispatch, getState) =>{
    //add user id with streams
    const {userId} = getState().auth;
    const response = await streams.post ('/streams', {...formValue, userId})


    dispatch({type: CREATE_STREAM, payload: response.data})
    //Do programmatic navigation to back user to thr root route
    history.push('/')

}
//FETCH_STREAMS {get}
export const fetchStreams = formValue => async dispatch =>{
    const response = await streams.get ('/streams', formValue)

    dispatch({type: FETCH_STREAMS, payload: response.data})
}
//FETCH_STREAM {get}
export const fetchStream = (id) => async dispatch =>{
    const response = await streams.get (`/streams/${id}`)

    dispatch({type: FETCH_STREAM, payload: response.data})
}
//UPDATE_STREAM {put}
export const updateStream = (id,formValue) => async dispatch =>{
    const response = await streams.patch (`/streams/${id}`, formValue)

    dispatch({type: UPDATE_STREAM, payload: response.data})
}
//DELETE_STREAM {delete}
export const deleteStream = (id) => async dispatch =>{
    await streams.delete (`/streams/${id}`)

    dispatch({type: DELETE_STREAM, payload: id})
    history.push('/')
}
