import { useState, useEffect } from "react";
import Card from "../UI/Card/Card";
import classes from "./Home.css";

import React from "react";
import {
  Box,
  UnorderedList,
  ListItem,
  Button,
  Textarea,
} from "@chakra-ui/react";

const Comment = ({ comment, item, items, setItems }) => {
  const { title, id, edit } = comment;
  const { id: todoId, comments } = item;

  const [error, setError] = useState(null);
  const [value, setValue] = useState(title);

  const onEdit = () => {
    setError(null);

    const index = items.findIndex((t) => t.id === todoId);
    const newItems = [...items];

    const newComments = [...comments];
    const commentIndex = newComments.findIndex((c) => c.id === id);
    const comment = newComments.find((c) => c.id === id);

    if (edit) {
      if (!value) {
        setError("Please enter a comment");
        return;
      }

      newComments.splice(commentIndex, 1, {
        ...comment,
        title: value,
        edit: false,
      });

      newItems.splice(index, 1, {
        ...item,
        comments: newComments,
      });
      setItems(newItems);
      return;
    }

    newComments.splice(commentIndex, 1, {
      ...comment,
      edit: true,
    });

    newItems.splice(index, 1, {
      ...item,
      comments: newComments,
    });
    setItems(newItems);
  };

  const onDelete = () => {
    // find todo
    const index = items.findIndex((t) => t.id === todoId);

    // find comment
    const newItems = [...items];
    newItems.splice(index, 1, {
      ...item,
      comments: comments.filter((c) => c.id !== id),
    });

    setItems(newItems);
  };

  const onCancel = () => {
    setError(null);
    // find todo
    const index = items.findIndex((t) => t.id === todoId);

    // find comment
    const newItems = [...items];

    const newComments = [...comments];
    const commentIndex = newComments.findIndex((c) => c.id === id);
    const comment = newComments.find((c) => c.id === id);
    newComments.splice(commentIndex, 1, {
      ...comment,
      edit: false,
    });

    newItems.splice(index, 1, {
      ...item,
      comments: newComments,
    });

    setItems(newItems);
  };

  return (
    <ListItem>
      <div
        style={{
          display: "flex",
          gap: 5,
          marginBottom: 5,
        }}
      >
        {edit ? (
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter comment"
          />
        ) : (
          <span>{title}</span>
        )}

        <Button colorScheme="green" onClick={onEdit} size="sm">
          {edit ? "Save" : "Edit"}
        </Button>
        {edit && (
          <Button colorScheme="blue" onClick={onCancel} size="sm">
            Cancel
          </Button>
        )}

        <Button colorScheme="red" onClick={onDelete} size="sm">
          Delete
        </Button>
      </div>
      {error && (
        <span
          style={{
            color: "red",
          }}
        >
          {error}
        </span>
      )}
    </ListItem>
  );
};

const Comments = ({ item, items, setItems }) => {
  const { comments = [] } = item;

  if (comments.length === 0) {
    return <small>No comments</small>;
  }

  return (
    <UnorderedList>
      {comments.map((comment, i) => (
        <Comment
          key={i}
          comment={comment}
          item={item}
          items={items}
          setItems={setItems}
        />
      ))}
    </UnorderedList>
  );
};

// render each todo item
const TodoItem = ({ item, items, setItems }) => {
  // todo item props
  const { title, id, edit, comments = [] } = item;

  // erros state, when editing todo but empty
  const [error, setError] = useState(null);

  // current edited todo item
  const [value, setValue] = useState(title);

  const onEdit = () => {
    setError(null);

    const index = items.findIndex((t) => t.id === id);
    const todoItem = items.find((t) => t.id === id);
    const newItems = [...items];

    if (edit) {
      if (!value) {
        setError("Please enter a value");
        return;
      }

      newItems.splice(index, 1, {
        ...todoItem,
        edit: false,
        title: value,
      });
      setItems(newItems);
      return;
    }

    newItems.splice(index, 1, {
      ...todoItem,
      edit: true,
    });
    setItems(newItems);
  };

  const onDelete = () => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  };

  const onCancel = () => {
    setError(null);
    const index = items.findIndex((t) => t.id === id);
    const todoItem = items.find((t) => t.id === id);
    const newItems = [...items];

    newItems.splice(index, 1, {
      ...todoItem,
      edit: false,
    });
    setItems(newItems);
  };

  const onAddComment = () => {
    const index = items.findIndex((t) => t.id === id);
    const todoItem = items.find((t) => t.id === id);
    const newItems = [...items];

    newItems.splice(index, 1, {
      ...todoItem,
      comments: [
        ...comments,
        {
          id: `${id}_comment_${comments.length}`,
          title: null,
          edit: true,
        },
      ],
    });

    setItems(newItems);
  };

  return (
    <div className="">
      <div className="">
        {edit ? (
          <>
            <Textarea value={value} onChange={(e) => setValue(e.target.value)} />
            
          </>
          
        ) : (
          <div className="flex justify-center my-4">
            <span className="text-center">{title}</span>
          </div>
        )}

        <div className="flex justify-center gap-3">
          <Button colorScheme="green" onClick={onEdit} size="sm">
            {edit ? "Save" : "Edit"}
          </Button>
          {edit && (
            <Button colorScheme="blue" onClick={onCancel} size="sm">
              Cancel
            </Button>
          )}

          <Button colorScheme="red" onClick={onDelete} size="sm">
            Delete
          </Button>

          <Button colorScheme="yellow" color="white" onClick={onAddComment} size="sm">
            Add Comment
          </Button>
        </div>
      </div>
      {error && (
        <span
          style={{
            color: "red",
          }}
        >
          {error}
        </span>
      )}

      <div className="my-3">
        <Comments item={item} items={items} setItems={setItems} />
      </div>

    </div>
  );
};

const Todos = () => {
  // current todo item
  const [todo, setTodo] = useState(null);
  // todo items
  const [items, setItems] = useState([]);
  // error state
  const [error, setError] = useState(null);

  // add new todo item
  const addTodo = () => {
    setError(null);

    // valdate if todo state is empty
    if (!todo) {
      // if empty render error
      setError("Please enter a todo");
      return;
    }

    // if no error grab the current items state, then append the new todo item
    const newItems = [
      ...items,
      {
        id: `todo_${items.length + 1}`,
        title: todo,
        edit: false,
        comments: [],
      },
    ];

    // update state
    setItems(newItems);
    // reset todo input
    setTodo("");
  };

  return (
    <div className="flex justify-center">
      <div className="p-4 w-9/12 bg-cyan-100 rounded-md mt-20">
        <Textarea
          mb={2}
          placeholder="Enter todo..."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
         
        />
        {error && (
          <div
            style={{
              color: "red",
            }}
          >
            {error}
          </div>
        )}
        <div className="flex justify-center">
          <Button colorScheme="blue" mb={5} mr={2} onClick={addTodo} >
            Add Todo
          </Button>
          <Button colorScheme="blue" mb={5} onClick={() => setItems([])}>
            Clear Todo
          </Button>
        </div>

        {/* todo items */}
        <UnorderedList marginTop="20px">
          {items.map((item, i) => (
            <TodoItem marginTop="10px" key={i} item={item} items={items} setItems={setItems} />
          ))}
        </UnorderedList>
      </div>
    </div>
  );
};

export default Todos;
