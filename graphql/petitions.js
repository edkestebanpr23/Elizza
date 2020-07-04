import { gql } from "@apollo/client";

const petitions = {
  LOGIN: gql`
    mutation loginWorker($input: LoginInput) {
      loginWorker (input: $input) {
        token
        name
        telephone
        img
        rol
        active
      }
    }
    `,
  CREATE_USER: gql`
    mutation createWorker ($input: WorkerInput) {
      createWorker(input:$input) 
    }
    `,
  CREATE_CUSTOMER: gql`
    mutation createClient ($input: ClientInput) {
      createClient(input: $input)
    }
  `,
  GET_CUSTOMERS: gql`
    query getClients {
      getClients {
        id
        name
        telephone
        telephone2
        whatsapp
        description
        sex
        active
      }
    }
  `,
};

module.exports = petitions;