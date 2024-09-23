import { useSelector, useDispatch } from "react-redux";
import { add } from './todoSlice';
import { createRef } from "react";

export default function App() {
  const nameRef = createRef();
  const items = useSelector(state => state.todo.items);
  const dispath = useDispatch();

  return <div>
    <h1>Redux Todo</h1>
    <form onSubmit={e => {
      e.preventDefault();
      dispath( add(nameRef.current.value) );
      e.currentTarget.reset();
    }}>
      <input ref={nameRef} />
      <button>Add</button>
    </form>
    <ul>
      {items.map(item => {
        return <li key={item.id}>
          {item.name}
        </li>
      })}
    </ul>
  </div>
}