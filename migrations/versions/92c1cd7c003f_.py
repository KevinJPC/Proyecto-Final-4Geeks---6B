"""empty message

<<<<<<< HEAD:migrations/versions/f158b9ef1573_.py
Revision ID: f158b9ef1573
Revises: 
Create Date: 2021-03-16 15:30:56.439464
=======
Revision ID: 92c1cd7c003f
Revises: 
Create Date: 2021-03-15 21:24:15.117005
>>>>>>> 5bfcd2ac23101a1660faae684d47942448673ac7:migrations/versions/92c1cd7c003f_.py

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
<<<<<<< HEAD:migrations/versions/f158b9ef1573_.py
revision = 'f158b9ef1573'
=======
revision = '92c1cd7c003f'
>>>>>>> 5bfcd2ac23101a1660faae684d47942448673ac7:migrations/versions/92c1cd7c003f_.py
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