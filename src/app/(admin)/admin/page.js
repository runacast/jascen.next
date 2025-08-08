export default function Form({params, searchParams}) {

    return <div className="session-panel">
        <form className="form">
            <fieldset className="field-group">
                <div className="form-area">
                    <label className="sec-1">Usuario</label>
                    <input className="sec-3" type="text" />
                </div>
            </fieldset>
            <fieldset className="field-group">
                <div className="form-area">
                    <label className="sec-1">Clave</label>
                    <input className="sec-3" type="password" />
                </div>
            </fieldset>
            <fieldset className="field-group">
                <div className="form-area">
                    <button type="submit" className="btn btn-form">Iniciar Sesión</button>
                </div>
            </fieldset>
        </form>
    </div>

}