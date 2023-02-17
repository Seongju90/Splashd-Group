from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')
    if '@' not in email:
        raise ValidationError('Please provide a valid email')
    if '.' not in email:
        raise ValidationError('Please provide a valid email')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def age_check(form, field):
    # Checking if user exists
    age = field.data
    if age < 21:
        raise ValidationError('Must be 21 or older.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    # email = StringField('email', validators=[DataRequired('An email is required'), user_exists])
    email = StringField('email', validators=[DataRequired('An email is required'), user_exists, Email('Please provide a valid email')])
    first_name = StringField('first name', validators=[DataRequired('First Name Required')])
    last_name = StringField('last name', validators=[DataRequired('Last Name Required')])
    age = IntegerField('age', validators=[DataRequired('Whats yo Age?'), age_check])
    password = StringField('password', validators=[DataRequired('Please make a password')])
    profile_pic = StringField('profile_pic')
