import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  name = 'Otto Tirta'; // Assuming based on folder name, customizable
  role = 'Software Engineer';
  bio = 'Passionate about building scalable web applications and intuitive user experiences. Specialized in Angular, TypeScript, and modern web technologies.';
  
  socialLinks = [
    { name: 'GitHub', url: 'https://github.com', icon: '💻' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: '👔' },
    { name: 'Email', url: 'mailto:example@email.com', icon: '📧' }
  ];
}
