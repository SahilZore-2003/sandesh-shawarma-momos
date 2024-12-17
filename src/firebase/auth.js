import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
    updatePassword,
    signInWithPopup,
    GoogleAuthProvider,
    updateProfile,
} from "firebase/auth";

const doCreateUserWithEmailAndPassword = async (email, password, name) => {

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await updateProfile(user, {
        displayName: name,
    });
    const userRef = doc(db, "users", user.userUID);
    const userData = {
        name: user.displayName || "Anonymous",
        email: user.email || "No email provided",
        createdAt: new Date(),
    };
    await setDoc(userRef, userData, { merge: true });
    return user;
};

const resetPasswordWithEmail = async (email) => {
    return await sendPasswordResetEmail(auth, email)
}

const doSignInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user
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
    doSignInWithGoogle,
    resetPasswordWithEmail
}

