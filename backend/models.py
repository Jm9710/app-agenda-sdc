from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


# Modelo Usuario
class Usuario(db.Model):
    __tablename__ = 'usuarios'

    id_us = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String(20), nullable=False)
    contrasena = db.Column(db.String(20), nullable=False)

    # Relación con Cliente
    clientes = db.relationship("Cliente", back_populates="usuario_rel")

    def __repr__(self):
        return f'Usuario {self.id_us} {self.nombre}'

    def serialize(self):
        return {"id_us": self.id_us, "nombre": self.nombre}


# Modelo Cliente
class Cliente(db.Model):
    __tablename__ = 'clientes'

    id_cliente = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String(20), nullable=False)
    apellido = db.Column(db.String(20), nullable=False)
    cedula = db.Column(db.String(20), nullable=False)
    direccion = db.Column(db.String(100))
    telefono = db.Column(db.String(30))
    actualizado_por = db.Column(db.Integer, db.ForeignKey('usuarios.id_us'))

    # Relaciones
    usuario_rel = db.relationship("Usuario", back_populates="clientes")
    trabajos = db.relationship("Trabajo", back_populates="cliente_rel")

    def __repr__(self):
        return f'Cliente {self.id_cliente} {self.nombre} {self.apellido}'

    def serialize(self):
        return {
            "id": self.id_cliente,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "cedula": self.cedula,
            "direccion": self.direccion,
            "telefono": self.telefono,
            "actualizado_por": self.actualizado_por
        }


# Modelo Estado Trabajo
class Estado(db.Model):
    __tablename__ = 'estado'

    id_estado = db.Column(db.Integer, primary_key=True)
    tipo_estado = db.Column(db.String(20), nullable=False)

    # Relación con Trabajo
    trabajos = db.relationship("Trabajo", back_populates="estado_rel")

    def __repr__(self):
        return f'Estado{self.id_estado} {self.tipo_estado}'

    def serialize(self):
        return {"id_estado": self.id_estado, "tipo_estado": self.tipo_estado}

# Modelo Estado Contable
class Estado_Contable(db.Model):
    __tablename__ = 'estado_contable'

    id_estado_contable = db.Column(db.Integer, primary_key=True)
    tipo_estado_contable = db.Column(db.String(20), nullable=False)

    # Relación con Trabajo
    trabajos = db.relationship("Trabajo", back_populates="estado_contable_rel")

    def __repr__(self):
        return f'Estado_Contable {self.id_estado_contable} {self.tipo_estado_contable}'

    def serialize(self):
        return {"id_estado_contable": self.id_estado_contable, "tipo_estado_contable": self.tipo_estado_contable}

# Modelo TipoTrabajo
class TipoTrabajo(db.Model):
    __tablename__ = 'tipo_trabajo'

    id_tipo_trabajo = db.Column(db.Integer, primary_key=True)
    nombre_tipo_trabajo = db.Column(db.String(20), nullable=False)

    # Relación con Trabajo
    trabajos = db.relationship("Trabajo", back_populates="tipo_trabajo_rel")

    def __repr__(self):
        return f'TipoTrabajo {self.id_tipo_trabajo} {self.nombre_tipo_trabajo}'

    def serialize(self):
        return {
            "id_tipo_trabajo": self.id_tipo_trabajo,
            "nombre_tipo_trabajo": self.nombre_tipo_trabajo
        }


# Modelo Trabajo
class Trabajo(db.Model):
    __tablename__ = 'trabajos'

    id_trabajo = db.Column(db.Integer, primary_key=True, autoincrement=True)
    tipo_de_trabajo = db.Column(db.Integer, db.ForeignKey('tipo_trabajo.id_tipo_trabajo'))
    num_trabajo = db.Column(db.Integer, unique=True)
    fecha_solicitud = db.Column(db.DateTime, default=datetime.utcnow)
    nombre_trabajo = db.Column(db.String(50), nullable=False)
    manzana = db.Column(db.String(50))
    solar = db.Column(db.String(50))
    padron = db.Column(db.String(50))
    departamento = db.Column(db.String(50))
    localidad = db.Column(db.String(50))
    cliente_id = db.Column(db.Integer, db.ForeignKey('clientes.id_cliente'))
    telefono_cliente = db.Column(db.String(15))
    moneda = db.Column(db.String(10))
    costo = db.Column(db.String(10))
    entrego = db.Column(db.String(10))
    deuda = db.Column(db.String(10))
    iva = db.Column(db.Boolean, default=False)
    comentarios = db.Column(db.String(1000))
    estado = db.Column(db.Integer, db.ForeignKey('estado.id_estado'))
    estado_contable = db.Column(db.Integer, db.ForeignKey('estado_contable.id_estado_contable'))

    # Relaciones
    tipo_trabajo_rel = db.relationship("TipoTrabajo", back_populates="trabajos")
    estado_rel = db.relationship("Estado", back_populates="trabajos")
    estado_contable_rel = db.relationship("Estado_Contable", back_populates="trabajos")
    cliente_rel = db.relationship("Cliente", back_populates="trabajos")

    def __repr__(self):
        return f'Trabajo {self.id_trabajo} {self.nombre_trabajo}'

    def serialize(self):
        return {
            "id_trabajo": self.id_trabajo,
            "tipo_de_trabajo": self.tipo_de_trabajo,
            "num_trabajo": self.num_trabajo,
            "fecha_solicitud": self.fecha_solicitud,
            "nombre_trabajo": self.nombre_trabajo,
            "manzana": self.manzana,
            "solar": self.solar,
            "padron": self.padron,
            "departamento": self.departamento,
            "localidad": self.localidad,
            "cliente_id": self.cliente_id,
            "telefono_cliente": self.telefono_cliente,
            "moneda": self.moneda,
            "costo": self.costo,
            "entrego": self.entrego,
            "deuda": self.deuda,
            "iva": self.iva,
            "comentarios": self.comentarios,
            "estado": self.estado,
            "estado_contable": self.estado_contable
        }

