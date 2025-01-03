import os
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from models import db, Usuario, Estado, TipoTrabajo, Trabajo, Cliente

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'

    # Inicializa Flask-Admin
    admin = Admin(app, name='SDC Admin', template_mode='bootstrap3')

    # Vista para el modelo Usuario
    admin.add_view(ModelView(Usuario, db.session))

    # Vista para el modelo Estado
    admin.add_view(ModelView(Estado, db.session))

    # Vista para el modelo TipoTrabajo
    admin.add_view(ModelView(TipoTrabajo, db.session))

    # Vista para el modelo Trabajo (con personalización)
    class TrabajoModelView(ModelView):
        column_list = [
            'id_trabajo', 'tipo_de_trabajo', 'num_trabajo', 'fecha_solicitud', 'nombre_trabajo', 
            'manzana', 'solar', 'padron', 'departamento', 'localidad', 'cliente_id', 'telefono_cliente', 
            'moneda', 'costo', 'iva', 'comentarios', 'estado_trabajo'
        ]
        form_columns = [
            'tipo_de_trabajo', 'num_trabajo', 'fecha_solicitud', 'nombre_trabajo', 'manzana', 'solar', 
            'padron', 'departamento', 'localidad', 'cliente_id', 'telefono_cliente', 'moneda', 'costo', 
            'iva', 'comentarios', 'estado_trabajo'
        ]
        # Puedes también personalizar otras configuraciones como la validación de los formularios.
    admin.add_view(TrabajoModelView(Trabajo, db.session))

    # Vista para el modelo Cliente
    admin.add_view(ModelView(Cliente, db.session))


