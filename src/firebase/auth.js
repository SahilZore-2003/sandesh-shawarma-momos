import { auth } from "./firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
    updatePassword,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";

const doCreateUserWithEmailAndPassword = async (email, password) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    return await sendEmailVerification(user)
};

const doSignInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // add user to firestore
};

const doSignOut = () => {
    return auth.signOut();
};

const doPasswordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
};

const doPasswordChange = (password) => {
    return updatePassword(auth.currentUser, password);
};

const doSendEmailVerification = () => {
    return sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/home`,
    });
};

export {
    doCreateUserWithEmailAndPassword,
    doSendEmailVerification,
    doPasswordChange,
    doPasswordReset,
    doSignOut,
    doSignInWithEmailAndPassword,
    doSignInWithGoogle
}

