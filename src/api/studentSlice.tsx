import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const studentApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://test.omniswift.com.ng/api/' }),
  endpoints: (builder) => ({
    getAllStudent: builder.query({
      query: () => `viewAllData`,
    }),
    getAllState: builder.query({
      query: () => `viewAllStates`,
    }),
    getAllLevel: builder.query({
      query: () => `viewAllLevels`,
    }),
    getAllGender: builder.query({
      query: () => `viewAllGender`,
    }),
    getAllAge: builder.query({
      query: () => `viewAllAges`,
    }),
    getResult: builder.query({
      query: ({id}) => ({
        url: `viewResult/${id}`,
        method: "POST"
      })
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllStudentQuery,useGetAllStateQuery,useGetAllLevelQuery,useGetAllAgeQuery,useGetAllGenderQuery,useGetResultQuery} = studentApi

