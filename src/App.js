import React, { useState, useEffect, useContext } from "react"
import { Router, Link, navigate } from "@reach/router"

import useNetlifyIdentity from "hooks/useNetlifyIdentity"
import { UserCtx } from "contexts"
import Footer from "./components/Footer"
import Spinner from "./components/Spinner"
import InputArea from "./components/InputArea"
import TodoItem from "./components/TodoItem"
import "./login.css"

import { useQuery, useMutation } from "react-apollo-hooks"
import gql from "graphql-tag"

const NotFound = () => (
  <div>
    <h2>Not found</h2>
    <p>Sorry, nothing here.</p>
    <Link to="/">Go back to the main page.</Link>
  </div>
)

function Login() {
  const { user, doLogin, doLogout } = useContext(UserCtx)
  const style = { cursor: "pointer" }
  var actionForm = (
    <span>
      <button style={style} onClick={doLogin}>
        Login or Sign Up
      </button>
    </span>
  )
  return (
    <div className="Login">
      {user ? (
        <button style={style} onClick={doLogout}>
          Logout
        </button>
      ) : (
        actionForm
      )}
    </div>
  )
}

// const GET_COMMENTS = gql`
//   query getcomments {
//     allComments {
//       name
//       message
//     }
//   }
// `

function List(props) {
  return (
    <div>
      {" "}
      list here <pre>{JSON.stringify(null, 2, props)}</pre>{" "}
    </div>
  )
}

// function List(props) {
//   const { data, error, loading } = useQuery(GET_COMMENTS)
//   if (loading) {
//     return <div>Loading...</div>
//   }
//   if (error) {
//     return <div>Error! {error.message}</div>
//   }

//   const [state, setState] = useState(null)
//   const { listId, uri } = props
//   const pathFlag = props.path.split("/")[1] || "all"

//   const shownTodos =
//     state &&
//     state.todos &&
//     {
//       all: state.todos,
//       active: state.todos.filter(todo => !todo.data.completed),
//       completed: state.todos.filter(todo => todo.data.completed)
//     }[pathFlag]
//   useEffect(
//     () =>
//       client &&
//       void fetchList(listId)
//         .then(setState)
//         .catch(err => console.log({ err }) || setState({ err })),
//     [client]
//   )
//   const [editing, setEditing] = useState(null)
//   const edit = todo => () => setEditing(todo.ref)
//   const onClearCompleted = () => load(clearCompleted(state.list, listId).then(setState))
//   return (
//     <div>
//       {(isLoading || !state || !state.list) && <Spinner />}
//       <div className="listNav">
//         <label>List: {state && state.list.data.title}</label>
//         <button onClick={() => navigate("/")}>back to all lists</button>
//       </div>
//       <ul className="todo-list">
//         {state && state.err ? (
//           <div>{JSON.stringify(state.err, null, 2)} </div>
//         ) : (
//           shownTodos &&
//           shownTodos.map(todo => {
//             const handle = fn => () => load(fn(todo, listId).then(setState))
//             return (
//               <TodoItem
//                 key={todo.ref.value.id}
//                 todo={todo.data}
//                 onToggle={handle(toggle)}
//                 onDestroy={handle(destroy)}
//                 onEdit={edit(todo)}
//                 editing={editing === todo.ref}
//                 onSave={val => handle(save(val))()}
//                 onCancel={console.log}
//               />
//             )
//           })
//         )}
//       </ul>
//       <InputArea
//         onSubmit={title => load(addTodo(state.list, listId)(title).then(setState))}
//         placeholder="Add a new item to your list."
//       />

//       {state && state.todos && (
//         <Footer
//           count={shownTodos.length}
//           completedCount={state.todos.filter(todo => todo.data.completed).length}
//           onClearCompleted={onClearCompleted}
//           nowShowing={pathFlag}
//           uri={uri
//             .split("/")
//             .slice(0, 3)
//             .join("/")}
//         />
//       )}
//     </div>
//   )
// }

const GETALLLISTS = gql`
  query getcomments {
    allComments {
      name
      message
    }
  }
`

function AllLists() {
  const { data, error, loading } = useQuery(GETALLLISTS)
  if (loading) {
    return <Spinner />
  }
  if (error) {
    return <div>Error! {error.message}</div>
  }
  const { lists } = data

  const onSubmit = title => {} // load(addList(title))
  return (
    <div>
      <div className="listNav">
        <label>Choose a list.</label>
      </div>
      <section className="main">
        <ul className="todo-list">
          {lists.map(({ data, ref }) => {
            return (
              <li key={ref.value.id}>
                {/* <label onClick={() => alert('go')}>{data.title}</label> */}
                <label>
                  <Link to={`/list/${ref.value.id}`}>{data.title}</Link>
                </label>
              </li>
            )
          })}
        </ul>
      </section>
      <InputArea onSubmit={onSubmit} placeholder="Create a new list or choose from above." />
    </div>
  )
}

const Wrapper = props => props.children

export default function App(props) {
  const identity = useNetlifyIdentity(faunadb_token => {
    console.log("FROMAPP", faunadb_token)
    // onAuthChange(faunadb_token).then(_client => {
    //   if (_client) load(getServerLists(_client))
    // })
  })

  return (
    <UserCtx.Provider value={identity}>
      <div>
        <header className="header">
          <Login />
          {identity.user && (
            <Router>
              <AllLists path="/" />
              <Wrapper path="list">
                <List path=":listId" />
                <List path=":listId/active" />
                <List path=":listId/completed" />
                <NotFound default />
              </Wrapper>
              <NotFound default />
            </Router>
          )}
        </header>
      </div>
    </UserCtx.Provider>
  )
}
