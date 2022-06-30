from app import create_app
import eventlet

port = 5005
app = create_app()

if __name__ == "__main__":
    eventlet.wsgi.server(eventlet.listen(('', port)), app)
