/**
 * Utils class for Authentication related
 */

export function getFirebaseErrorMsg(err: any): string {
  if (err) {
    return decodeFireBaseErr(err);
  }
  return "Server error occured, but could not get a detailed message from backend."
}

export function decodeFireBaseErr(err: any): string {
  let errMsg: string = "Server error occured."
  switch (err.code) {
    case "auth/email-already-in-use": {
      errMsg = "Email already exists.";
      break;
    }
    case "auth/invalid-email": {
      errMsg = "Email is invalid.";
      break;
    }
    case "auth/operation-not-allowed": {
      errMsg = "This operation is currently not allowed.";
      break;
    }
    case "auth/weak-password": {
      errMsg = "Password is too weak, try 6+ characters.";
      break;
    }
    case "auth/user-not-found": {
      errMsg = "User does not exist.";
      break;
    }
    case "auth/wrong-password": {
      errMsg = "Invalid password.";
      break;
    }
    case "": {
      errMsg = "BLAH.";
      break;
    }
  }
  return errMsg + " " + err['message'];
}
