#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import webbrowser
from threading import Timer

os.environ["DJANGO_SETTINGS_MODULE"] = "redsentir.settings"

import cherrypy
from django.conf import settings
from django.core.handlers.wsgi import WSGIHandler

import django
django.setup()

class ProyectoRedSentir(object):
    HOST = "redsentir.org"
    PORT = 443

    def mount_static(self, url, root):
        """
        :param url: Relative url
        :param root: Path to static files root
        """
        config = {
            'tools.staticdir.on': True,
            'tools.staticdir.dir': root,
            'tools.expires.on': True,
            'tools.expires.secs': 86400
        }
        cherrypy.tree.mount(None, url, {'/': config})

    def open_browser(self):
        Timer(3, webbrowser.open, ("http://%s:%s" % (self.HOST, self.PORT),)).start()

    def force_tls(self):
        if cherrypy.request.scheme == "http" :
            raise cherrypy.HTTPRedirect(cherrypy.url().replace("http:", "https:"), status = 301)

    def load_http_server(self):
        server = cherrypy._cpserver.Server()
        server.socket_host = "0.0.0.0"
        server.socket_port = 80
        server.subscribe()


    def run(self):
        configuracion = {
            'server.socket_host' : self.HOST,
            'server.socket_port' : self.PORT,
            'server.ssl_module': 'pyopenssl',
            'server.ssl_certificate' : settings.BASE_DIR+'/ssl/redsentir.crt',
            'server.ssl_private_key' : settings.BASE_DIR+'/ssl/redsentir.key',
            'tools.force_tls.on' : True,
            'engine.autoreload_on': False,
            'log.screen': True
        }
        self.mount_static(settings.STATIC_URL, settings.STATIC_ROOT)
        cherrypy.response.headers["Access-Control-Allow-Origin"] = "redsentir.org"
        cherrypy.log("Inciando la Plataforma de la Red Sentir.")
        cherrypy.tree.graft(WSGIHandler())
        cherrypy.tools.force_tls = cherrypy.Tool("before_handler", self.force_tls)
        self.load_http_server()
	    cherrypy.config.update(configuracion)
        #self.open_browser()
        cherrypy.engine.start()
        cherrypy.engine.block()


if __name__ == "__main__":
    ProyectoRedSentir().run()
