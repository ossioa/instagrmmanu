import React from 'react';
import GroupActions from './GroupActions';
import GroupPostList from './GroupPostList';

const GroupPage = ({ groupId }) => {
  if (!groupId) {
    console.error('groupId is undefined');
    return <div>Error: groupId is not defined</div>;
  }

  return (
    <div>
      <GroupActions groupId={groupId} />
      <GroupPostList groupId={groupId} />
    </div>
  );
};

export default GroupPage;
