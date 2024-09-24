import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../config/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { FaPlus } from 'react-icons/fa';

const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');  // Gérer le nom du groupe
  const { currentUser } = useAuth();  // Récupérer l'utilisateur actuel depuis le contexte d'authentification
  const [error, setError] = useState('');  // Gérer les erreurs


  const handleCreateGroup = async (e) => {
    e.preventDefault();  // Empêcher le rechargement de la page
    if (!groupName) {  // Vérifier si le nom du groupe est vide
      setError('Group name cannot be empty');
      return;
    }
    try {
      await addDoc(collection(db, 'groups'), {
        name: groupName,  // Nom du groupe à créer
        owner: currentUser.uid,  // L'utilisateur connecté est propriétaire du groupe
        members: {
          [currentUser.uid]: true  // Ajouter le propriétaire comme membre initial
        }
      });
      setGroupName('');  // Réinitialiser le champ de saisie du nom de groupe après succès
    } catch (error) {
      console.error('Error creating group: ', error);  // Log de l'erreur
      setError('Failed to create group.');  // Mettre à jour l'état d'erreur
    }
  };


  return (
    <form onSubmit={handleCreateGroup} className="border rounded-lg p-4 shadow-lg mb-4 bg-gray-100">
      {/* Champ de saisie pour le nom du groupe */}
      <input
        type="text"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="Group Name"
        className="input input-bordered w-full mb-2"
      />

      {/* Bouton de soumission pour créer le groupe */}
      <button 
        type="submit" 
        className="btn btn-sm mt-2 shadow bg-green-500 text-white hover:bg-green-400 hover:text-black font-bold"
        disabled={!groupName}  // Désactiver le bouton si le nom du groupe est vide
      >
        Create Group <FaPlus className="ml-2" />
      </button>

      {/* Affichage de l'erreur si elle existe */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  );

};

export default CreateGroup;
