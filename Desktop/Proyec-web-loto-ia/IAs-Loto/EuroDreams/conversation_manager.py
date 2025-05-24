# config.py o settings.py

from conversation_manager import ConversationManager

class AIContext:
    def __init__(self):
        self.conversation_manager = ConversationManager()
        self.personal_context = True

    def toggle_personal_context(self):
        self.personal_context = not self.personal_context

    def get_response(self, user_message):
        if self.personal_context:
            return self.conversation_manager.get_ai_response(user_message)
        else:
            # Aquí iría la lógica para obtener una respuesta sin contexto personal
            return "Respuesta sin contexto personal: " + user_message

aicontext = AIContext()

# Uso
print(aicontext.get_response("Hola, ¿cómo estás?"))
print(aicontext.get_response("¿Cuál es la capital de Francia?"))
print(aicontext.get_response("¿Recuerdas mi primera pregunta?"))

# Para desactivar el contexto personal
aicontext.toggle_personal_context()
print(aicontext.get_response("¿Recuerdas mi primera pregunta?"))