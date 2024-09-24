import React from 'react';
import GroupActions from './GroupActions';
import GroupPostList from './GroupPostList';
import CreateGroupPost from './CreateGroupPost';

const GroupPage = ({ groupId }) => {
  // Vérification de la présence de groupId pour éviter les erreurs
  if (!groupId) {
    console.error('groupId is undefined');
    return <div className="text-red-500 font-bold">Error: groupId is not defined</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Composant pour les actions du groupe */}
      <GroupActions groupId={groupId} />

      {/* Composant pour créer un nouveau post */}
      <div className="my-6">
        <CreateGroupPost groupId={groupId} />
      </div>

      {/* Composant pour afficher la liste des posts */}
      <div className="my-6">
        <GroupPostList groupId={groupId} />
      </div>
    </div>
  );
};

export default GroupPage;
