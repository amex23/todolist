

import Card from '../UI/Card/Card';
import classes from './Home.module.css';

import React, {Component} from 'react';
import { Button, Input, Textarea   } from '@chakra-ui/react'

export default class Home extends Component {
  constructor () {
    super ();
    this.state = {
      todo_array: [],
      task: '',
      edit_task: '',
    };
  }

  onChangeTask = e => {
    this.setState ({
      task: e.target.value,
    });
  };

  addTask = () => {
    let {todo_array, task} = this.state;
    let obj = {
      id: todo_array.length == 0 ? 1 : todo_array[todo_array.length - 1].id + 1,
      name: task,
      is_editing: false,
      is_done: false,
    };
    todo_array.push (obj);
    this.setState ({
      todo_array: todo_array,
      task: '',
    });
  };

  edit = object => {
    let {todo_array} = this.state;

    let i = todo_array.findIndex (task => task.id === object.id);
    todo_array[i].is_editing = !todo_array[i].is_editing;

    todo_array.map (task => {
      task.id !== object.id
        ? (task.is_editing = false)
        : (task.is_editing = task.is_editing);
      return task;
    });

    this.setState ({
      todo_array: todo_array,
      edit_task: object.name,
    });
  };

  editTask = task => {
    this.setState ({
      edit_task: task,
    });
  };

  saveEditTask = object => {
    let {todo_array, edit_task} = this.state;
    let i = todo_array.findIndex (task => task.id === object.id);
    todo_array[i].name = edit_task;

    this.setState (
      {
        todo_array: todo_array,
        edit_task: '',
      },
      e => {
        this.edit (object);
      }
    );
  };

  delete = object => {
    let {todo_array} = this.state;
    let i = todo_array.findIndex (task => task.id === object.id);
    todo_array.splice (i, 1);
    this.setState ({
      todo_array: todo_array,
    });
  };

  done = object => {
    let {todo_array} = this.state;
    let i = todo_array.findIndex (task => task.id === object.id);
    todo_array[i].is_done = true;

    this.setState ({
      todo_array: todo_array,
    });
  };


  addComment = () => {
    let {comment_array, comment} = this.state;
    let obj = {
      id: comment_array.length == 0 ? 1 : comment_array[comment_array.length - 1].id + 1,
      name: comment,
      is_editing: false,
      is_done: false,
    };
    comment_array.push (obj);
    this.setState ({
      comment_array: comment_array,
      comment: '',
    });
  };

  render () {
    return (
      <div className='bg-red-400 w-full flex justify-start flex-col items-center h-screen gap-10'>
        <div className='bg-red-400 w-full bg-green-400 mt-32'>
          <h2 className='text-center'>My Todo List</h2>
        </div>

        <div className='gap-4'>
          <Textarea
            id="standard-basic"
            autoComplete="off"
            value={this.state.task}
            onChange={this.onChangeTask}
            placeholder="Add TO DO"
          />
          <Button
            className="bg-yellow-400"
            variant="contained"
            color="primary"
            size="small"
            disabled={this.state.task == ''}
            onClick={this.addTask}
          >
            Add
          </Button>
        </div>

        {this.state.todo_array.length > 0
          ? <div className='bg-pink-400 w-9/12 flex justify-center items-center py-5 px-5 flex-col gap-3'>
              <div className="bg-blue-200 w-full">
              
                    <div className='flex'>
                      <div className='w-1/2 p-4'>Taskzzz</div>
                      <div className='w-1/2 p-4'>Action</div>
                    </div>
                  
                {this.state.todo_array.map ((object, i) => {
                  return (
                    <div className='bg-violet-400 w-full' >
                        <div className='w-full bg-green-400 flex py-4'>
                          <div className='w-1/2 bg-violet-100 py-4 px-4'>
                            {object.is_editing
                              ? <Textarea
                                  id="standard-basic"
                                  value={this.state.edit_task}
                                  onChange={e => this.editTask (e.target.value)}
                                />
                              : object.is_done
                                  ? <s>{object.name}</s>
                                  : <span>{object.name}</span>}
                          </div>
                          <div className='w-1/2 bg-red-200 gap-3 py-4 px-4'>
                            {object.is_editing
                              ? <div className='flex gap-3'>
                                  <Button
                                    className="button_style"
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    disabled={this.state.edit_task == ''}
                                    onClick={e => this.saveEditTask (object)}
                                  >
                                    Save
                                  </Button>
                                  <Button
                                    className="button_style"
                                    variant="outlined"
                                    color=""
                                    size="small"
                                    onClick={e => this.edit (object)}
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              : <div className="flex gap-3"> 
                                  <Button
                                    className="button_style"
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    onClick={e => this.edit (object)}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    className="button_style"
                                    variant="outlined"
                                    color="secondary"
                                    size="small"
                                    disabled={object.is_done}
                                    onClick={e => this.done (object)}
                                  >
                                    Done
                                  </Button>
                                  <Button
                                    className="button_style"
                                    variant="outlined"
                                    size="small"
                                    onClick={e => this.delete (object)}
                                  >
                                    Delete
                                  </Button>
                                </div>}
                          </div>   
                        </div>
                        <div className="w-full bg-yellow-200 py-4 px-4">
                          <p>comment</p>

                          <Button
                            className="bg-yellow-400"
                            variant="contained"
                            color="primary"
                            size="small"
                            disabled={this.state.comment == ''}
                            onClick={this.addComment}
                          >
                            Add
                          </Button>
                        </div>
                    </div>                    
                  );
                })}
              </div>
                
            </div>
          : <h2>Nothing to do!</h2>}
      </div>
    );
  }
}