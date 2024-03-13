from flask_sqlalchemy import SQLAlchemy

# Default image for pets without a specific photo
GENERIC_IMAGE = "https://mylostpetalert.com/wp-content/themes/mlpa-child/images/nophoto.gif"

db = SQLAlchemy()

class Pet(db.Model):
    """Model representing adoptable pets."""

    __tablename__ = "pets"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    species = db.Column(db.Text, nullable=False)
    photo_url = db.Column(db.Text)
    age = db.Column(db.Integer)
    notes = db.Column(db.Text)
    available = db.Column(db.Boolean, nullable=False, default=True)

    def get_image_url(self):
        """Get the image URL for the pet, using a specific photo or a generic one."""
        return self.photo_url or GENERIC_IMAGE

def connect_db(app):
    """Connect this database to the provided Flask app.

    This function should be called in your Flask app to establish the database connection.
    """
    db.app = app
    db.init_app(app)
