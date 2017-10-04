class Model {
  constructor() {
    this.todos = [];
    this.inputValue = null; //  vacio
    this.render = undefined; // no definido
  }

  subscribe(render) {
    this.render = render;
  }
  inform() {
    // console.log(this.todos.map(e => e.text));
    this.render();
  }
  addTodo(text) {
    this.todos.push({
      id: Utils.uuid(), //local storage
      text: text, //input nuevo
      completed: false //el estado del texto
    });
    this.inform();
  }
  updateTodo(index, todo) {
    this.todos[index] = todo; // el array en la posicion index = todo
    this.inform();
  }
  removeTodo(todo) {
    this.todos = this.todos.filter(item => item !== todo); // se filtra el array con solo items diferentes a  todo
    this.inform();
  }
}

const App = ({ title, model }) => {
  const items = model.todos.map((todo, index) => {
    return (
      <div className="main">
            <h2>Invitees</h2>
        <li key={todo.id}>
          <input
            type="text"
            value={todo.text}
            onChange={e =>
              model.updateTodo(index, {
                id: todo.id,
                text: e.target.value,
                completed: todo.completed
              })}
          />
          <button onClick={() => model.removeTodo(todo)}> delete item</button>
        </li>
      </div>
    );
  });
  return (
    <div className="wrapper">
      <header>
        <h1>RSVP</h1>
        <p> {title} </p>
      </header>
      <form id="registrar"
        onSubmit={e => {
          e.preventDefault();
          model.addTodo(model.inputValue);
        }}
      >
        <input onChange={e => (model.inputValue = e.target.value)} />
        <button type="submit">Add Item</button>
      </form>
      <ul id="invitedList"> {items} </ul>
    </div>
  );
};

let model = new Model();
let counter = 1;
let render = () => {
  console.log("render times: ", counter++);
  ReactDOM.render(
    <App title="Registration App" model={model} />,
    document.getElementById("container")
  );
};
//La etiqueta es la vista y la propiedad es la clase
model.subscribe(render);
render();
