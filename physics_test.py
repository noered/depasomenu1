from manim import *
from manim_physics import *

class PhysicsTestScene(SpaceScene):
    def construct(self):
        # Set up the scene title
        title = Text("Manim-Physics Test", font_size=48, color=WHITE)
        title.to_edge(UP, buff=0.5)
        self.add(title)
        
        # Create a ground platform
        ground = Rectangle(width=8, height=0.5, color=GRAY, fill_opacity=0.8)
        ground.move_to(DOWN * 3)
        self.make_static_body(ground)
        
        # Create walls
        left_wall = Rectangle(width=0.3, height=6, color=GRAY, fill_opacity=0.8)
        left_wall.move_to(LEFT * 4 + UP * 1)
        right_wall = Rectangle(width=0.3, height=6, color=GRAY, fill_opacity=0.8)
        right_wall.move_to(RIGHT * 4 + UP * 1)
        
        self.make_static_body(left_wall, right_wall)
        
        # Create various falling objects with different properties
        # Red circle - heavy
        heavy_ball = Circle(radius=0.4, color=RED, fill_opacity=0.8)
        heavy_ball.move_to(LEFT * 2 + UP * 4)
        
        # Blue square - medium
        medium_box = Square(side_length=0.6, color=BLUE, fill_opacity=0.8)
        medium_box.move_to(UP * 4)
        
        # Green triangle - light
        light_triangle = Triangle(color=GREEN, fill_opacity=0.8)
        light_triangle.scale(0.5)
        light_triangle.move_to(RIGHT * 2 + UP * 4)
        
        # Yellow star - bouncy
        bouncy_star = Star(outer_radius=0.3, color=YELLOW, fill_opacity=0.8)
        bouncy_star.move_to(LEFT * 1 + UP * 5)
        
        # Purple hexagon
        purple_hex = RegularPolygon(n=6, radius=0.3, color=PURPLE, fill_opacity=0.8)
        purple_hex.move_to(RIGHT * 1 + UP * 5)
        
        # Add all objects to the scene
        objects = VGroup(heavy_ball, medium_box, light_triangle, bouncy_star, purple_hex)
        walls = VGroup(ground, left_wall, right_wall)
        
        self.add(objects, walls)
        
        # Make objects rigid bodies so they respond to physics
        self.make_rigid_body(heavy_ball, medium_box, light_triangle, bouncy_star, purple_hex)
        
        # Add some labels to identify the objects
        labels = VGroup(
            Text("Heavy", font_size=20, color=RED).next_to(heavy_ball, UP, buff=0.2),
            Text("Medium", font_size=20, color=BLUE).next_to(medium_box, UP, buff=0.2),
            Text("Light", font_size=20, color=GREEN).next_to(light_triangle, UP, buff=0.2),
            Text("Bouncy", font_size=20, color=YELLOW).next_to(bouncy_star, UP, buff=0.2),
            Text("Hex", font_size=20, color=PURPLE).next_to(purple_hex, UP, buff=0.2)
        )
        
        self.add(labels)
        
        # Let physics run for 8 seconds
        self.wait(8)
        
        # Add some energy by creating an explosion effect
        explosion = VGroup()
        for i in range(20):
            particle = Dot(radius=0.05, color=random_color())
            particle.move_to(ORIGIN)
            explosion.add(particle)
        
        self.play(
            *[particle.animate.shift(
                np.random.uniform(-2, 2) * RIGHT + 
                np.random.uniform(-2, 2) * UP
            ).fade(1) for particle in explosion],
            run_time=1
        )
        
        # Continue physics simulation
        self.wait(5)

class SimplePhysicsTest(Scene):
    def construct(self):
        # Create a simple physics demonstration without video output
        title = Text("Simple Physics Test", font_size=48, color=WHITE)
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
