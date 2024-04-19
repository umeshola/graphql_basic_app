import React, { useState } from 'react'
import { CREATE_TODO } from './query';
import { useMutation } from '@apollo/client';
export default function Add() {
    const [name,setName]=useState("")
    const [funxtion, { data, loading, error }] = useMutation(CREATE_TODO);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await funxtion({
                variables: {
                    data: name
                }
            });
            if (data) {
                window.location='/'
            }
        } catch (error) {
            console.error('Error adding:', error);
        }
    };
    console.log(data)
    return (
        <div className='flex justify-center mt-32'>
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">Add Todo</h5>
                    <div>
                        <label for="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your todo</label>
                        <input onChange={(e)=>{
                            setName(e.target.value)
                        }} type="text" placeholder="heading" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>

                </form>
            </div>

        </div>
    )
}
