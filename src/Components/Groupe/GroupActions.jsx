import React, { useEffect, useState } from 'react';
import { doc, onSnapshot, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { FaTrash, FaEdit } from 'react-icons/fa';

const GroupActions = ({ groupId }) => {
  // Initialisation des états
  const [groupData, setGroupData] = useState(null);  // Stocke les données du groupe
  const [newGroupName, setNewGroupName] = useState('');  // Nouveau nom de groupe
  const [editMode, setEditMode] = useState(false);  // Mode édition activé/désactivé

  // Récupération des données du groupe avec useEffect et Firestore
  useEffect(() => {
    if (!groupId) {
      console.error('groupId is undefined');
      return;
    }

    const groupDocRef = doc(db, 'groups', groupId);  // Référence du document Firestore pour le groupe

    // Abonnement aux mises à jour en temps réel via onSnapshot
    const unsubscribe = onSnapshot(groupDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setGroupData(docSnapshot.data());  // Mise à jour des données de groupe dans l'état
      } else {
        console.error('No such document!');
      }
    }, (error) => {
      console.error('Error fetching document:', error);  // Gestion des erreurs
    });

    return () => unsubscribe();  // Désabonnement lors du démontage
  }, [groupId]);

  // Fonction pour mettre à jour le nom du groupe
  const handleUpdate = async () => {
    if (!groupId || !newGroupName) {
      console.error('groupId or newGroupName is undefined');
      return;
    }

    const groupDocRef = doc(db, 'groups', groupId);  // Référence du document du groupe

    try {
      await setDoc(groupDocRef, { name: newGroupName }, { merge: true });  // Mise à jour du nom
      console.log('Group successfully renamed!');
      setEditMode(false);  // Désactiver le mode d'édition
      setNewGroupName('');  // Réinitialiser le champ du nouveau nom
    } catch (error) {
      console.error('Error updating document:', error);  // Gestion des erreurs
    }
  };

  // Fonction pour supprimer le groupe
  const handleDelete = async () => {
    if (!groupId) {
      console.error('groupId is undefined');
      return;
    }

    const groupDocRef = doc(db, 'groups', groupId);  // Référence du document Firestore du groupe

    try {
      await deleteDoc(groupDocRef);  // Suppression du groupe
      console.log('Group successfully deleted!');
    } catch (error) {
      console.error('Error deleting document:', error);  // Gestion des erreurs
    }
  };

  // Rendu du composant
  return (
    <div className="border rounded-lg p-4 shadow-lg mb-4 bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Group Actions</h2>
      {groupData ? (
        <div>
          <p>Group Name: {groupData.name}</p>

          {editMode ? (
            // Mode édition pour renommer le groupe
            <div className="flex items-center">
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="Enter new group name"
                className="input input-bordered w-full mb-2"
              />
              <button onClick={handleUpdate} className="btn btn-sm ml-2 shadow bg-green-500 text-white hover:text-black font-bold">
                Save <FaEdit className="ml-2" />
              </button>
            </div>
          ) : (
            // Bouton pour activer le mode édition
            <button onClick={() => setEditMode(true)} className="btn btn-sm mt-2 shadow bg-blue-500 text-white hover:text-black font-bold">
              Rename Group <FaEdit className="ml-2" />
            </button>
          )}

          {/* Bouton pour supprimer le groupe */}
          <button onClick={handleDelete} className="btn btn-sm mt-2 shadow bg-red-500 text-white hover:text-black font-bold ml-32">
            Delete Group <FaTrash className="ml-2" />
          </button>
        </div>
      ) : (
        <p>Loading group data...</p>  // Affichage pendant le chargement des données
      )}
    </div>
  );
};

export default GroupActions;
