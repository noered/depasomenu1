from manim import *

class SimpleTest(Scene):
    def construct(self):
        # Create a simple test scene
        title = Text("Animo Test", font_size=48, color=WHITE)
        title.to_edge(UP, buff=0.5)
        
        # Create some basic shapes
        circle = Circle(radius=0.5, color=RED, fill_opacity=0.8)
        circle.move_to(LEFT * 2)
        
        square = Square(side_length=0.8, color=BLUE, fill_opacity=0.8)
        square.move_to(ORIGIN)
        
        triangle = Triangle(color=GREEN, fill_opacity=0.8)
        triangle.scale(0.6)
        triangle.move_to(RIGHT * 2)
        
        # Add shapes to scene
        shapes = VGroup(circle, square, triangle)
        self.add(title, shapes)
        
        # Animate the shapes
        self.play(
            circle.animate.move_to(UP * 2),
            square.animate.rotate(PI/4),
            triangle.animate.scale(1.5),
            run_time=2
        )
        
        self.wait(1)
        
        # Create a bouncing effect
        self.play(
            circle.animate.move_to(DOWN * 2),
            square.animate.move_to(UP * 1),
            triangle.animate.move_to(DOWN * 1),
            run_time=1.5
        )
        
        self.wait(2)

