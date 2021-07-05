function loginAlert(auth) {
  if (!auth) {
    alert('You must log in first!');

    return true;
  }
  return false;
}

export { loginAlert };
