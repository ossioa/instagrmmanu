import React from 'react';
import GroupActions from './GroupActions';
import GroupPostList from './GroupPostList';
import CreateGroupPost from './CreateGroupPost';

const GroupPage = ({ groupId }) => {
  if (!groupId) {
    console.error('groupId is undefined');
    return <div>Error: groupId is not defined</div>;
  }

  return (
    <div>
      <GroupActions groupId={groupId} />
      <CreateGroupPost groupId={groupId} />
      <GroupPostList groupId={groupId} />
    </div>
  );
};

export default GroupPage;
