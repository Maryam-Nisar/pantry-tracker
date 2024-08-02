'use client'
// src/pages/index.jsx
import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

export default function Home() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: '' });
  const [total, setTotal] = useState(0);

  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.name !== '' && newItem.price !== '') {
      await addDoc(collection(db, 'pantryItems'), {
        name: newItem.name.trim(),
        price: newItem.price,
      });
      setNewItem({ name: '', price: '' });
    }
  };

  useEffect(() => {
    const q = query(collection(db, 'pantryItems'));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let itemArr = [];
      QuerySnapshot.forEach((doc) => {
        itemArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemArr);

      const calculateTotal = () => {
        const totalPrice = itemArr.reduce(
          (sum, item) => sum + parseFloat(item.price) || 0,
          0
        );
        setTotal(totalPrice);
      };
      calculateTotal();
    });
    return () => unsubscribe();
  }, []);

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, 'pantryItems', id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 flex flex-col">
      <header className="bg-slate-950 p-4 flex items-center justify-between">
        <h1 className="text-white text-3xl font-bold">Pantry Tracker</h1>
      </header>
      <main className="flex-grow p-6">
        <div className="max-w-5xl mx-auto bg-slate-800 p-6 rounded-lg shadow-lg">
          <form className="grid grid-cols-6 gap-4 mb-6" onSubmit={addItem}>
            <input
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="col-span-3 p-3 border border-slate-950 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 transition duration-300"
              type="text"
              placeholder="Enter Item"
            />
            <input
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              className="col-span-2 p-3 border border-slate-950 rounded-lg mx-3 focus:outline-none focus:ring-2 focus:ring-slate-500 transition duration-300"
              type="text"
              placeholder="Enter $"
            />
            <button
              type="submit"
              className="bg-slate-950 text-white p-3 text-2xl rounded hover:bg-slate-800 transition duration-300 shadow-lg transform hover:scale-105"
            >
              +
            </button>
          </form>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search items..."
              className="p-3 border border-slate-950 rounded-lg w-full"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.id} className="bg-slate-950 p-4 rounded-lg shadow-lg">
                <h2 className="text-white text-xl font-semibold">{item.name}</h2>
                <p className="text-white">${item.price}</p>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="mt-4 bg-red-600 text-white p-2 rounded hover:bg-red-500 transition duration-300"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          {items.length > 0 && (
            <div className="text-white flex justify-between p-3 bg-slate-900 rounded-lg mt-6">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          )}
        </div>
      </main>
      <footer className="bg-slate-950 p-4 text-center text-white">
        <p>&copy; 2024 Pantry Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
}
