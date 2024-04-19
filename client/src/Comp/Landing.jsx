import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { TRUE_TODO } from './query';
import { UPDATE_TODO } from './query';

export default function Landing() {
    const { loading, error, data } = useQuery(TRUE_TODO);
    const [updateTodo] = useMutation(UPDATE_TODO);

    const handelUpdate = async (Id) => {
        try {
            const { data } = await updateTodo({
                variables: {
                    data: Id
                }
            });
            if (data) {
                window.location = '/';
            }
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };
    return (
        <div>
            <div className='flex justify-center pt-32'>
                <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center justify-center mb-4">
                        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">all Todos</h5>
                    </div>
                    <div className="flow-root h-80 overflow-y-scroll">
                        {data?.todotrue.length == 0 ?
                            <div>
                                <h1 className='flex justify-center mt-9 ml-3 text-yellow-300 text-2xl'>NO TODO LEFT</h1>
                            </div>
                            : <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                {data?.todotrue.map(todo => (
                                    <li key={todo?._id} className="py-3 sm:py-4">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0"></div>
                                            <div className="flex-1 min-w-0 ms-4">
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{todo.name}</p>
                                            </div>
                                            <button onClick={() => handelUpdate(todo?._id)} className="hover:underline hover:text-green-400 inline-flex items-center text-base font-semibold text-blue-500">Done</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        }
                    </div>
                </div>
            </div>
            <div className='flex justify-center'>
                <a href="/add">
                    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">ADD</span>
                    </button>
                </a>
            </div>
        </div>
    );
}
