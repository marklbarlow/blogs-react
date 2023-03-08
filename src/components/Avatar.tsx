export const Avatar = (props: { username: string }) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <span role="username"> by {props.username} </span>
    </div>
  );
};
