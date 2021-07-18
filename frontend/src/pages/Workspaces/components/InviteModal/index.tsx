import React, { useState } from 'react'
import union from 'lodash/union'
import filter from 'lodash/filter'
import isEmpty from 'lodash/isEmpty'

import { inviteMembers } from 'api/dataset'

import './index.scss'

export default ({id, onClose}) => {
  const [usernameList, setUsernameList] = useState([])
  const [usernameInput, setUsernameImput] = useState('')

  const onRemoveClick = (removeUsername) => {
    setUsernameList(filter(usernameList, username => username !== removeUsername ))
  }

  const onInputChange = (e) => {
    const value = e.target.value
    if ((value) && (value[value.length-1] === ' ')) {
      setUsernameList(union(usernameList, [value.slice(0, value.length-1)]));
      setUsernameImput('');
    } else {
      setUsernameImput(value);
    }
  }

  const onSubmit = async () => {
    if (isEmpty(usernameList)) {
      await inviteMembers(id, [usernameInput]) 
    } else {
      await inviteMembers(id, [usernameList])
    }
    onClose()
  }

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSubmit()
    }
  }

  return (
    <div className='invite-modal-wrapper'>
      <div className='invite-modal'>
        <div className='title'>Invite member</div>
        <div className='username-list'>
          {usernameList.map(tag => <div className='username' onClick={() => onRemoveClick(tag)}>{tag}</div>)}
        </div>
        <input 
          value={usernameInput}
          onChange={onInputChange} 
          className='input' 
          onKeyPress={onKeyPress}
        />
        <div className='button-line'>
          <button className='button invite-button' 
            onClick={onSubmit} 
            disabled={isEmpty(usernameList) && isEmpty(usernameInput)}
          >
            Invite
          </button>
          <button className='button cancel-button' onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}