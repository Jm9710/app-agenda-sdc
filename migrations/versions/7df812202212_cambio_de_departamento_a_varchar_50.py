"""Cambio de departamento a VARCHAR(50)

Revision ID: 7df812202212
Revises: 
Create Date: 2025-01-18 14:34:54.718184

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7df812202212'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('clientes', schema=None) as batch_op:
        batch_op.alter_column('nombre',
               existing_type=sa.VARCHAR(length=20),
               nullable=False)
        batch_op.alter_column('apellido',
               existing_type=sa.VARCHAR(length=20),
               nullable=False)
        batch_op.alter_column('cedula',
               existing_type=sa.INTEGER(),
               type_=sa.String(length=20),
               nullable=False)
        batch_op.alter_column('direccion',
               existing_type=sa.VARCHAR(length=20),
               type_=sa.String(length=100),
               existing_nullable=True)
        batch_op.alter_column('telefono',
               existing_type=sa.INTEGER(),
               type_=sa.String(length=15),
               existing_nullable=True)

    with op.batch_alter_table('estado', schema=None) as batch_op:
        batch_op.alter_column('tipo_estado',
               existing_type=sa.VARCHAR(length=20),
               nullable=False)

    with op.batch_alter_table('tipo_trabajo', schema=None) as batch_op:
        batch_op.alter_column('nombre_tipo_trabajo',
               existing_type=sa.VARCHAR(length=20),
               nullable=False)

    with op.batch_alter_table('trabajos', schema=None) as batch_op:
        batch_op.alter_column('nombre_trabajo',
               existing_type=sa.VARCHAR(length=50),
               nullable=False)
        batch_op.alter_column('telefono_cliente',
               existing_type=sa.VARCHAR(length=20),
               type_=sa.String(length=15),
               existing_nullable=True)
        batch_op.alter_column('moneda',
               existing_type=sa.VARCHAR(length=20),
               type_=sa.String(length=10),
               existing_nullable=True)
        batch_op.alter_column('costo',
               existing_type=sa.VARCHAR(length=20),
               type_=sa.String(length=10),
               existing_nullable=True)

    with op.batch_alter_table('usuarios', schema=None) as batch_op:
        batch_op.alter_column('nombre',
               existing_type=sa.VARCHAR(length=20),
               nullable=False)
        batch_op.alter_column('contrasena',
               existing_type=sa.VARCHAR(length=20),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('usuarios', schema=None) as batch_op:
        batch_op.alter_column('contrasena',
               existing_type=sa.VARCHAR(length=20),
               nullable=True)
        batch_op.alter_column('nombre',
               existing_type=sa.VARCHAR(length=20),
               nullable=True)

    with op.batch_alter_table('trabajos', schema=None) as batch_op:
        batch_op.alter_column('costo',
               existing_type=sa.String(length=10),
               type_=sa.VARCHAR(length=20),
               existing_nullable=True)
        batch_op.alter_column('moneda',
               existing_type=sa.String(length=10),
               type_=sa.VARCHAR(length=20),
               existing_nullable=True)
        batch_op.alter_column('telefono_cliente',
               existing_type=sa.String(length=15),
               type_=sa.VARCHAR(length=20),
               existing_nullable=True)
        batch_op.alter_column('nombre_trabajo',
               existing_type=sa.VARCHAR(length=50),
               nullable=True)

    with op.batch_alter_table('tipo_trabajo', schema=None) as batch_op:
        batch_op.alter_column('nombre_tipo_trabajo',
               existing_type=sa.VARCHAR(length=20),
               nullable=True)

    with op.batch_alter_table('estado', schema=None) as batch_op:
        batch_op.alter_column('tipo_estado',
               existing_type=sa.VARCHAR(length=20),
               nullable=True)

    with op.batch_alter_table('clientes', schema=None) as batch_op:
        batch_op.alter_column('telefono',
               existing_type=sa.String(length=15),
               type_=sa.INTEGER(),
               existing_nullable=True)
        batch_op.alter_column('direccion',
               existing_type=sa.String(length=100),
               type_=sa.VARCHAR(length=20),
               existing_nullable=True)
        batch_op.alter_column('cedula',
               existing_type=sa.String(length=20),
               type_=sa.INTEGER(),
               nullable=True)
        batch_op.alter_column('apellido',
               existing_type=sa.VARCHAR(length=20),
               nullable=True)
        batch_op.alter_column('nombre',
               existing_type=sa.VARCHAR(length=20),
               nullable=True)

    # ### end Alembic commands ###
