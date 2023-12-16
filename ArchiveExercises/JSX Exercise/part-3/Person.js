
function Person({ age, hobbies, name }) {
  const voteText = age >= 18 ? "please go vote!" : "you must be 18";

  const hobbiesLIs = hobbies.map(hobby => <li>{hobby}</li>);

  return (
    <div>
      <p>Learn some information about this bee:</p>
      <ul>
        <li>Name: {name.substring(0, 6)}</li>
        <li>Age: {age} ... {voteText}</li>
        <ul>
          Hobbies: {hobbiesLIs}
        </ul>
      </ul>
    </div>
  );
}