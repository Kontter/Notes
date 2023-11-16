import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICard } from '../models/models'


export const notesApi = createApi({
    reducerPath: 'notesApi',
    tagTypes: ['notesApi'],                           
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/'
    }),
    refetchOnFocus: true,                              
    endpoints: build => ({
        getCards: build.query<ICard[], any>({      
            query: () => ({
                url: `cards`,
            }),    
            providesTags: (result) =>   
            result
              ? [
                  ...result.map(({ id }) => ({ type: 'notesApi' as const, id })),  
                  { type: 'notesApi', id: 'LIST' },
                ]
              : [{ type: 'notesApi', id: 'LIST' }],                                                                        
        }),

        changeNotes: build.mutation<ICard, ICard>({
            query: (card: ICard) => ({
                url: `cards/${card.id}`,
                method: 'PUT',
                body: card 
            }),
            invalidatesTags: [{type: 'notesApi', id: 'LIST'}]  
        }),

        addNewNote: build.mutation<ICard, ICard>({
            query: (card: ICard) => ({
                url: `cards/${card.id}`,
                method: 'PUT',
                body: card 
            }),
            invalidatesTags: [{type: 'notesApi', id: 'LIST'}]  
        }),

        addNewCard: build.mutation<ICard, ICard>({
            query: (card: ICard) => ({
                url: `cards/`,
                method: 'POST',
                body: card 
            }),
            invalidatesTags: [{type: 'notesApi', id: 'LIST'}]  
        }),

        removeNote: build.mutation<ICard, ICard>({
            query: (card: ICard) => ({
                url: `cards/${card.id}`,
                method: 'PUT',
                body: card 
            }),
            invalidatesTags: [{type: 'notesApi', id: 'LIST'}]  
        }),

        removeCard: build.mutation<ICard, ICard>({
            query: (card: ICard) => ({
                url: `cards/${card.id}`,
                method: 'DELETE',
                body: card 
            }),
            invalidatesTags: [{type: 'notesApi', id: 'LIST'}]  
        }),

        editNote: build.mutation<ICard, ICard>({
            query: (card: ICard) => ({
                url: `cards/${card.id}`,
                method: 'PUT',
                body: card 
            }),
            invalidatesTags: [{type: 'notesApi', id: 'LIST'}]  
        }),

        editCardTitle: build.mutation<ICard, ICard>({
            query: (card: ICard) => ({
                url: `cards/${card.id}`,
                method: 'PUT',
                body: card 
            }),
            invalidatesTags: [{type: 'notesApi', id: 'LIST'}]  
        }),
    })
})

export const { 
    useGetCardsQuery, 
    useChangeNotesMutation, 
    useAddNewNoteMutation, 
    useAddNewCardMutation, 
    useRemoveNoteMutation, 
    useRemoveCardMutation, 
    useEditNoteMutation, 
    useEditCardTitleMutation 
} = notesApi  