import React, { Component } from 'react';
import contacts from './contacts';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contacts: contacts.slice(0, 5)
    }
  }
  addRandomContact() {
    let haveANewContact = false
    let randomIndex;
    for (let i = 0; i < 10 && !haveANewContact; i++) {
      randomIndex = Math.floor(Math.random() * contacts.length)
      haveANewContact = !this.state.contacts.some(c => c.name === contacts[randomIndex].name)
    }
    if (haveANewContact) {
      this.setState({
        contacts: [...this.state.contacts, contacts[randomIndex]]
      })
    }
  }
  sortContacts(field, isAsc) {
    let productAsc = isAsc ? 1 : -1
    let sortedContacts = this.state.contacts.slice()
    sortedContacts.sort((a, b) => {
      if (a[field] > b[field]) return 1 * productAsc
      return -1 * productAsc
    })
    this.setState({
      contacts: sortedContacts
    })
  }
  handleDelete(indexToRemove) {
    this.setState({
      contacts: this.state.contacts.filter((c, i) => i !== indexToRemove)
    })
  }
  render() {
    return (
      <div className="App">
        <button onClick={e => this.addRandomContact()}>Add Random Contact</button>
        <button onClick={e => this.sortContacts('name', true)}>Sort Contacts (name)</button>
        <button onClick={e => this.sortContacts('popularity', false)}>Sort Contacts (popularity)</button>

        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.contacts.map((contact, i) => (<tr>
              <td><img src={contact.pictureUrl} /></td>
              <td>{contact.name}</td>
              <td>{contact.popularity}</td>
              <td><button onClick={e => this.handleDelete(i)}>Delete</button></td>
            </tr>))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
