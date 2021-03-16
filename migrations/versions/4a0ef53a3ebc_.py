"""empty message

<<<<<<< HEAD:migrations/versions/4a0ef53a3ebc_.py
Revision ID: 4a0ef53a3ebc
Revises: 
Create Date: 2021-03-16 21:28:11.775415
=======
<<<<<<< HEAD:migrations/versions/8156c89ef90d_.py
Revision ID: 8156c89ef90d
Revises: 
Create Date: 2021-03-16 20:06:11.123591
=======
Revision ID: 3986f3563353
Revises: 
Create Date: 2021-03-16 20:06:59.026598
>>>>>>> 258b4240aa22de597ff8bcf12c1d29235894f2c2:migrations/versions/3986f3563353_.py
>>>>>>> ef6770631183d8742ecc7fe1dcd1b6092e0eb3d0:migrations/versions/3986f3563353_.py

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
<<<<<<< HEAD:migrations/versions/4a0ef53a3ebc_.py
revision = '4a0ef53a3ebc'
=======
<<<<<<< HEAD:migrations/versions/8156c89ef90d_.py
revision = '8156c89ef90d'
=======
revision = '3986f3563353'
>>>>>>> 258b4240aa22de597ff8bcf12c1d29235894f2c2:migrations/versions/3986f3563353_.py
>>>>>>> ef6770631183d8742ecc7fe1dcd1b6092e0eb3d0:migrations/versions/3986f3563353_.py
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('User_client',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=255), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('User_restaurant',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=255), nullable=False),
    sa.Column('image_url', sa.String(length=250), nullable=True),
    sa.Column('address', sa.String(length=250), nullable=False),
    sa.Column('phone', sa.String(length=30), nullable=False),
    sa.Column('category', sa.String(length=150), nullable=False),
    sa.Column('welcome_message', sa.String(length=150), nullable=False),
    sa.Column('description', sa.String(length=250), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('Favorite_restaurants',
    sa.Column('user_client_id', sa.Integer(), nullable=False),
    sa.Column('user_restaurant_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_client_id'], ['User_client.id'], ),
    sa.ForeignKeyConstraint(['user_restaurant_id'], ['User_restaurant.id'], ),
    sa.PrimaryKeyConstraint('user_client_id', 'user_restaurant_id')
    )
    op.create_table('review',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_client_id', sa.Integer(), nullable=False),
    sa.Column('user_restaurant_id', sa.Integer(), nullable=False),
    sa.Column('comment', sa.String(length=255), nullable=True),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.Column('date', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['user_client_id'], ['User_client.id'], ),
    sa.ForeignKeyConstraint(['user_restaurant_id'], ['User_restaurant.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('review')
    op.drop_table('Favorite_restaurants')
    op.drop_table('User_restaurant')
    op.drop_table('User_client')
    # ### end Alembic commands ###