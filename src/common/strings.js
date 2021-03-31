//! GENERAL --------------------------------------------------------------------------------------------------

//? EN - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const EN_SUCCESS_TITLE = (data) => 'Success';
export const EN_SUCCESS_DESCRIPTION = (data) => '{0} completed correctly...'.replace('{0}', data);

export const EN_LABEL_ACTIONS = (data) => 'Actions';
export const EN_LABEL_CREATEDDATE = (data) => 'Created';
export const EN_LABEL_LISTS = (data) => 'Lists';

export const EN_BUTTONADD = (data) => 'Add';
export const EN_BUTTONDELETE = (data) => 'Delete';
export const EN_BUTTONVIDEO = (data) => 'Videos';
export const EN_BUTTONLISTS = (data) => 'Lists';

export const EN_EMPTY = (data) => 'Empty';

//? ES - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const ES_SUCCESS_TITLE = (data) => 'Éxito';
export const ES_SUCCESS_DESCRIPTION = (data) => '{0} completado correctamente...'.replace('{0}', data);

export const ES_LABEL_ACTIONS = (data) => 'Acciones';
export const ES_LABEL_CREATEDDATE = (data) => 'Fecha creación';
export const ES_LABEL_LISTS = (data) => 'Listas';

export const ES_BUTTONADD = (data) => 'Adicionar';
export const ES_BUTTONDELETE = (data) => 'Eliminar';
export const ES_BUTTONVIDEO = (data) => 'Videos';
export const ES_BUTTONLISTS = (data) => 'Listas';

export const ES_EMPTY = (data) => 'Vacio';

//! USER --------------------------------------------------------------------------------------------------

//? EN - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const EN_USER_MODALADD_TITLE = (data) => 'Adding User';
export const EN_USER_MODALDELETE_TITLE = (data) => 'Delete User';
export const EN_USER_MODALCHANGEPASSWORD_TITLE = (data) => 'Change user password';

export const EN_USER_ERROR_USERNAME_MESSAGE = (data) => 'Please, enter username!';
export const EN_USER_ERROR_EMAIL_MESSAGE = (data) => 'Please, enter email!';
export const EN_USER_ERROR_INVALID_EMAIL_MESSAGE = (data) => 'The input is not valid E-mail!';
export const EN_USER_ERROR_PASSWORD_EMPTY = (data) => 'Please, enter password!';
export const EN_USER_ERROR_CONFIRMPASSWORD_EMPTY = (data) => 'Please, enter confirmation password!';
export const EN_USER_ERROR_OLDPASSWORD_EMPTY = (data) => 'Please, enter old password!';
export const EN_USER_ERROR_PASSWORD_NOTMATCH = (data) => 'Passwords do not match!';
export const EN_USER_ERROR_LOADING = (data) => `Can not load users...!`;

export const EN_USER_LABEL_USERNAME = (data) => 'Username';
export const EN_USER_LABEL_EMAIL = (data) => 'Email';
export const EN_USER_LABEL_PASSWORD = (data) => 'Password';
export const EN_USER_LABEL_REPEATPASSWORD = (data) => 'Repeat password';
export const EN_USER_LABEL_OLDPASSWORD = (data) => 'Old password';
export const EN_USER_LABEL_ISADMIN = (data) => 'Is admin';
export const EN_USER_LABEL_CONFIRMED = (data) => 'Confirmed';

export const EN_USER_BUTTONCHANGEPASSWORD = (data) => 'Change password';

export const EN_USER_QUESTIONDELETE = (data) => 'Are you sure you want to remove this user?';
export const EN_USER_CONFIRMATIONADDED = (data) => 'User correctly added...';

//? ES - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const ES_USER_MODALADD_TITLE = (data) => 'Adicionar usuario';
export const ES_USER_MODALDELETE_TITLE = (data) => 'Eliminar usuario';
export const ES_USER_MODALCHANGEPASSWORD_TITLE = (data) => 'Cambiar contraseña de usuario';

export const ES_USER_ERROR_USERNAME_MESSAGE = (data) => 'Insertar nombre de usuario!';
export const ES_USER_ERROR_EMAIL_MESSAGE = (data) => 'Insertar correo electrónico!';
export const ES_USER_ERROR_INVALID_EMAIL_MESSAGE = (data) => 'Formato de email incorrecto!';
export const ES_USER_ERROR_PASSWORD_EMPTY = (data) => 'Insertar contraseña!';
export const ES_USER_ERROR_CONFIRMPASSWORD_EMPTY = (data) => 'Insertar contraseña de confirmación!';
export const ES_USER_ERROR_OLDPASSWORD_EMPTY = (data) => 'Insertar contraseña anterior!';
export const ES_USER_ERROR_PASSWORD_NOTMATCH = (data) => 'Las contraseñas no coinciden!';
export const ES_USER_ERROR_LOADING = (data) => `No se pudo cargar los usuarios...!`;

export const ES_USER_LABEL_USERNAME = (data) => 'Nombre usuario';
export const ES_USER_LABEL_EMAIL = (data) => 'Correo electrónico';
export const ES_USER_LABEL_PASSWORD = (data) => 'Contraseña';
export const ES_USER_LABEL_REPEATPASSWORD = (data) => 'Repetir contraseña';
export const ES_USER_LABEL_OLDPASSWORD = (data) => 'Contraseña anterior';
export const ES_USER_LABEL_ISADMIN = (data) => 'Es administrador';
export const ES_USER_LABEL_CONFIRMED = (data) => 'Confirmado';

export const ES_USER_BUTTONCHANGEPASSWORD = (data) => 'Cambiar contraseña';

export const ES_USER_QUESTIONDELETE = (data) => 'Esta seguro que desea eliminar este usuario?';
export const ES_USER_CONFIRMATIONADDED = (data) => 'Usuario adicionado correctamente...';

//! LIST --------------------------------------------------------------------------------------------------

//? EN - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const EN_LIST_LABEL_NAME = (data) => 'Name';
export const EN_LIST_LABEL_DESCRIPTION = (data) => 'Description';

export const EN_LIST_MODALADD_TITLE = (data) => 'Adding List';
export const EN_LIST_MODALDELETE_TITLE = (data) => 'Delete List';

export const EN_LIST_ERROR_NAME_MESSAGE = (data) => 'Please, enter name for the list!';

export const EN_LIST_BUTTONDELETE = (data) => 'Delete';

export const EN_LIST_ERROR_LOADING = (data) => `Can not load lists...!`;

export const EN_LIST_QUESTIONDELETE = (data) => 'Are you sure you want to remove this list?';
export const EN_LIST_CONFIRMATIONADDED = (data) => 'Video list correctly added...';

//? ES - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const ES_LIST_LABEL_NAME = (data) => 'Nombre';
export const ES_LIST_LABEL_DESCRIPTION = (data) => 'Descripción';

export const ES_LIST_MODALADD_TITLE = (data) => 'Adicionar Lista';
export const ES_LIST_MODALDELETE_TITLE = (data) => 'Eliminar Lista';

export const ES_LIST_ERROR_NAME_MESSAGE = (data) => 'Insertar nombre para la lista!';

export const ES_LIST_BUTTONDELETE = (data) => 'Eliminar';

export const ES_LIST_ERROR_LOADING = (data) => `No se pudo cargar las listas...!`;

export const ES_LIST_QUESTIONDELETE = (data) => 'Esta seguro que desea eliminar esta lista?';
export const ES_LIST_CONFIRMATIONADDED = (data) => 'Listado de video adicionado correctamente...';

//! VIDEOS --------------------------------------------------------------------------------------------------

//? EN - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const EN_VIDEO_MODALADD_TITLE = (data) => 'Add Video';
export const EN_VIDEO_ERROR_LOADING = (data) => `Can not load videos...!`;
export const EN_VIDEO_MODALDELETE_TITLE = (data) => 'Delete Video';
export const EN_VIDEO_BUTTONDELETE = (data) => 'Delete';
export const EN_VIDEO_QUESTIONDELETE = (data) => 'Are you sure you want to remove this video?';
export const EN_VIDEO_UPLOAD = (data) => 'Upload Video';
export const EN_VIDEO_CONFIRMATIONADDED = (data) => 'Video correctly added...';

//? ES - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const ES_VIDEO_MODALADD_TITLE = (data) => 'Adicionar Video';
export const ES_VIDEO_ERROR_LOADING = (data) => `No se pudieron cargar los videos...!`;
export const ES_VIDEO_MODALDELETE_TITLE = (data) => 'Eliminar Video';
export const ES_VIDEO_BUTTONDELETE = (data) => 'Eliminar';
export const ES_VIDEO_QUESTIONDELETE = (data) => 'Esta seguro que desea eliminar este video?';
export const ES_VIDEO_UPLOAD = (data) => 'Subir Video';
export const ES_VIDEO_CONFIRMATIONADDED = (data) => 'Video adicionado correctamente...';
