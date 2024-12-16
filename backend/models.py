from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime



db = SQLAlchemy()

class Usuario(db.Model):
    __tablename__ = 'usuarios'

    id_us = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String(20))
    contrasena = db.Column(db.String(20))

    # Relación con Cliente (inverso)
    clientes = db.relationship("Cliente", back_populates="usuario_rel")

    def __repr__(self):
        return f'Usuario {self.id_us} {self.nombre}'
    
    def serialize(self):
        return {
            "id_us": self.id_us,
            "nombre": self.nombre
        }

class Cliente(db.Model):
    __tablename__ = 'clientes'

    id_cliente = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String(20))
    apellido = db.Column(db.String(20))
    cedula = db.Column(db.Integer, unique=True)
    direccion = db.Column(db.String(20))
    telefono = db.Column(db.Integer)

    actualizado_por = db.Column(db.Integer, db.ForeignKey('usuarios.id_us'))

    # Relaciones
    usuario_rel = db.relationship("Usuario", back_populates="clientes")
    trabajos = db.relationship("Trabajo", back_populates="cliente")

    def __repr__(self):
        return f'Cliente {self.id_cliente} {self.nombre} {self.apellido}'
    
    def serialize(self):
        return {
            "id_cliente": self.id_cliente,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "cedula": self.cedula,
            "direccion": self.direccion,
            "telefono": self.telefono,
            "actualizado_por": self.actualizado_por
        }

class Estado(db.Model):
    __tablename__ = 'estado'

    id_estado = db.Column(db.Integer, primary_key=True)
    tipo_estado = db.Column(db.String(20))

    trabajos = db.relationship("Trabajo", back_populates="estado")

    def __repr__(self):
        return f'Estado {self.id_estado} {self.tipo_estado}'
    
    def serialize(self):
        return {
            "id_estado": self.id_estado,
            "tipo_estado": self.tipo_estado
        }

class TipoTrabajo(db.Model):
    __tablename__ = 'tipo_trabajo'

    id_tipo_trabajo = db.Column(db.Integer, primary_key=True)
    nombre_tipo_trabajo = db.Column(db.String(20))

    trabajos = db.relationship("Trabajo", back_populates="tipo_trabajo")

    def __repr__(self):
        return f'TipoTrabajo {self.id_tipo_trabajo} {self.nombre_tipo_trabajo}'
    
    def serialize(self):
        return {
            "id_tipo_trabajo": self.id_tipo_trabajo,
            "nombre_tipo_trabajo": self.nombre_tipo_trabajo
        }

class Trabajo(db.Model):
    __tablename__ = 'trabajos'

    id_trabajo = db.Column(db.Integer, primary_key=True, autoincrement=True)
    tipo_de_trabajo = db.Column(db.Integer, db.ForeignKey('tipo_trabajo.id_tipo_trabajo'))
    num_trabajo = db.Column(db.Integer, unique=True)
    fecha_solicitud = db.Column(db.DateTime, default=datetime.utcnow)
    nombre_trabajo = db.Column(db.String(50))
    manzana = db.Column(db.String(50))
    solar = db.Column(db.String(50))
    padron = db.Column(db.String(50))
    departamento = db.Column(db.String(50))
    localidad = db.Column(db.String(50))
    cliente_id = db.Column(db.Integer, db.ForeignKey('clientes.id_cliente'))
    telefono_cliente = db.Column(db.String(20))
    moneda = db.Column(db.String(20))
    costo = db.Column(db.String(20))
    iva = db.Column(db.Boolean, default=False)
    comentarios = db.Column(db.String(1000))
    estado_trabajo = db.Column(db.Integer, db.ForeignKey('estado.id_estado'))

    tipo_trabajo_rel = db.relationship("TipoTrabajo", back_populates="trabajos")
    estado_rel = db.relationship("Estado", back_populates="trabajos")
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
            "id_cliente": self.cliente_id,
            "telefono_cliente": self.telefono_cliente,
            "moneda": self.moneda,
            "costo": self.costo,
            "iva": self.iva,
            "comentarios": self.comentarios,
            "estado_trabajo": self.estado_trabajo
        }
